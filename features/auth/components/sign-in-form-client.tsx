import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Chrome, Github } from "lucide-react";

async function handleGoogleSignIn() {
  "use server";
  await signIn("google");
}

async function handleGitHubSignIn() {
  "use server";
  await signIn("github");
}

export const SignInFormClient = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Sign In
        </CardTitle>
        <CardDescription className="text-center">
          Choose your preferred sign-in method
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form action={handleGoogleSignIn}>
          <Button type="submit" variant={"outline"} className="w-full">
            <Chrome className="mr-2 w-4 h-4" />
            <span>Sign in with google</span>
          </Button>
        </form>
        <form action={handleGitHubSignIn}>
          <Button type="submit" variant={"outline"} className="w-full">
            <Github className="mr-2 w-4 h-4" />
            <span>Sign in with Github</span>
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 w-full">
          By signing in , you agree to our{" "}
          <a href="#" className="underline hover:text-primary">
            Terms of Services
          </a>
          and{" "}
          <a href="#" className="underline hover:text-primary">
            Privacy Policy
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};
