import Header from '../components/Header';
import Slot from '../components/Slot';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <Slot />
      </main>
    </div>
  );
}