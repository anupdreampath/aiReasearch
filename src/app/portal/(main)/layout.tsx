import Layout from '@/components/layout/Layout';
import FloatingChat from '@/components/chat/FloatingChat';

export default function PortalLayout({ children }) {
  return (
    <>
      <Layout mode="contributor">
        {children}
      </Layout>
      <FloatingChat />
    </>
  );
}
