import { SignOutButton, SignUpButton } from "@clerk/nextjs";

export default async function HomePage() {
  return (
    <div>
      <SignUpButton />
      <SignOutButton />
    </div>
  );
}
