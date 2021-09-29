// ? Componentes
import Header from './Header';
// ~ Componentes de Next
import Head from 'next/head';

const Layout = ( props ) => {
  return (
    <>
      <Head>
        <title>Node Send</title>
      </Head>

      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto">
          <Header />
          <main className="mt-20">
            { props.children }
          </main>
        </div>
      </div>
    </>
  );
}

export default Layout;