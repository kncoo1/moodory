import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <Image src="/logo.png" alt="Moodory Logo" width={100} height={100} />
      <h1 className="text-4xl font-bold mt-4">Welcome to Moodory</h1>
      <p className="mt-2 text-gray-600">Your personal mental health companion</p>
    </main>
  );
}