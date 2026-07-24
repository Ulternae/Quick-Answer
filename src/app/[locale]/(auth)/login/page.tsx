import Image from "next/image";

import { AppPreferences } from "@/components/common/app-preferences";
import { Brand } from "@/components/common/brand";
import { LoginForm } from "@/features/auth/client/components/login-form";

export default function LoginPage() {
  return (
    <main className="relative grid min-h-svh overflow-hidden bg-background lg:grid-cols-2">
      <section className="flex min-h-svh flex-col px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
        <header>
          <Brand className="text-xl text-focus" />
        </header>

        <div className="flex flex-1 items-center justify-center py-12">
          <LoginForm />
        </div>
      </section>

      <aside className="relative hidden min-h-svh items-center justify-end overflow-hidden lg:flex">
        <Image
          alt=""
          className="object-cover transition-[filter] duration-300 dark:brightness-[0.45] dark:saturate-75"
          fill
          priority
          sizes="50vw"
          src="/images/auth-abstract-background.png"
        />
        <p className="text-end text-primary text-4xl relative z-10 pr-10 pt-20">Quick Answer</p>
      </aside>

      <AppPreferences className="absolute right-6 bottom-6 z-20 lg:right-10 lg:bottom-10" />
    </main>
  );
}
