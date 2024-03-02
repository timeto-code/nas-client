"use client";

import { RegisterDto } from "@/DTOs/UserDTOs";
import { register } from "@/actions/api/register";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import Spinner from "../Spinner";

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [exception, setException] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(RegisterDto),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterDto>) => {
    startTransition(async () => {
      const res = await register(data);
      if (res?.error) {
        setSuccess(null);
        setError(res.error);
      }
      if (res?.success) {
        setSuccess(res.success);
        form.reset();
      }
    });
  };

  return (
    <div className="bg-slate-500 bg-opacity-70 p-14 self-center lg:w-2/5 lg:max-w-md rounded-md w-full shadow-lg">
      <h2 className="text-white text-4xl mb-8 font-semibold cursor-default">
        注册
      </h2>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <input
                        {...field}
                        disabled={isPending}
                        className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 opacity-80 appearance-none focus:outline-none focus:ring-0 peer"
                        placeholder=" "
                      />
                      <label className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                        用户名
                      </label>
                      <span className="text-sm text-[#cc3300]">
                        {form.formState.errors.name?.message}
                      </span>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <input
                        {...field}
                        disabled={isPending}
                        type="email"
                        className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 opacity-80 appearance-none focus:outline-none focus:ring-0 peer"
                        placeholder=" "
                      />
                      <label className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                        电子邮件
                      </label>
                      <span className="text-sm text-[#cc3300]">
                        {form.formState.errors.email?.message}
                      </span>
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
                      <span className="text-sm text-[#cc3300]">
                        {form.formState.errors.password?.message}
                      </span>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </Form>

          {!success && <FormError message={error || exception} />}
          <FormSuccess message={success} />
        </div>
        <Button className="h-12 w-full mt-10 text-base" disabled={isPending}>
          {isPending && (
            <Spinner className="mr-2 h-4 w-4 animate-spin text-[#339900]" />
          )}
          注册
        </Button>
        <p className="text-neutral-300 mt-12 cursor-default">
          已经有帐户了？
          <Link
            href="/login"
            scroll={false}
            className="text-white ml-1 hover:underline"
          >
            登录
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
