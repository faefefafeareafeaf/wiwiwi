import dynamic from 'next/dynamic';

const SomeClientOnlyComponent = dynamic(() => import('./SomeClientOnlyComponent'), { ssr: false });

export default function ExamplePage() {
  return (
    <div>
      <SomeClientOnlyComponent />
    </div>
  );
}
