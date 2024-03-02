"use client";

import { LoginDto } from "@/DTOs/UserDTOs";
import { login } from "@/actions/api/login";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormError from "../FormError";
import Spinner from "../Spinner";

const LoginForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(LoginDto),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof LoginDto>) => {
    startTransition(async () => {
      const authorize = await login(data);
      if (authorize?.error) return setError(authorize.error);
      setError(null);
      router.push("/");
    });
  };

  return (
    <div className="bg-slate-500 bg-opacity-70 p-14 self-center lg:w-2/5 lg:max-w-md rounded-md w-full shadow-lg">
      <h2 className="text-white text-4xl mb-8 font-semibold cursor-default">
        登录
      </h2>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <input
                        {...field}
                        disabled={isPending}
                        type="text"
                        className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 opacity-80 appearance-none focus:outline-none focus:ring-0 peer"
                        placeholder=" "
                      />
                      <label className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                        用户名
                      </label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <input
                        {...field}
                        disabled={isPending}
                        type="password"
                        className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 opacity-80 appearance-none focus:outline-none focus:ring-0 peer"
                        placeholder=" "
                      />
                      <label className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                        密码
                      </label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </Form>
          {/* <FormSuccess message="登录成功" /> */}
          {error && <FormError message={error} />}
        </div>
        <Button
          className="h-12 py-3 rounded-md w-full mt-8 text-base"
          disabled={isPending}
        >
          {isPending && (
            <Spinner className="mr-2 h-4 w-4 animate-spin text-[#339900]" />
          )}
          登录
        </Button>
      </form>
      <p className="text-neutral-300 mt-12 cursor-default">
        还没有帐户？
        <Link
          href="/register"
          scroll={false}
          className="text-white ml-1 hover:underline"
        >
          注册
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
