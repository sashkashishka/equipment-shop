import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import './globals.css';

import { RequestConfirmationSnackbar } from '@/components/Snackbar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { initTtag } from '@/i18n/server';
import { InitTtag } from '@/i18n/client';

interface iProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function PageLayout({ children, params }: iProps) {
  initTtag(params.locale);

  return (
    <html>
      <body>
        <div className="body">
          <RequestConfirmationSnackbar />
          <InitTtag locale={params.locale} />
          <Navbar locale={params.locale} />

          <div className="content">{children}</div>

          <Footer locale={params.locale} />
        </div>
      </body>
    </html>
  );
}
