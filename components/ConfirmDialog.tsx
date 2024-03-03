"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useConfirmDialogStore } from "@/lib/stores/useConfirmDialogStore";

const ConfirmDialog = () => {
  const {
    cancelText,
    className,
    confirmText,
    description,
    onCancel,
    onConfirm,
    open,
    title,
  } = useConfirmDialogStore((state) => {
    return {
      open: state.open,
      title: state.title,
      description: state.description,
      cancelText: state.cancelText,
      confirmText: state.confirmText,
      onConfirm: state.onConfirm,
      onCancel: state.onCancel,
      className: state.className,
    };
  });

  const close = () => {
    useConfirmDialogStore.setState({ open: false });
    if (onCancel) onCancel();
  };

  const confirm = (event: React.MouseEvent) => {
    onConfirm(event);
    useConfirmDialogStore.setState({ open: false });
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className={cn(className)}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={close}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={confirm}>{confirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
