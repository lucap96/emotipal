'use client';

import { ReactElement } from 'react';

// next
import { SessionProvider } from 'next-auth/react';

// project-imports
import ThemeCustomization from 'themes';
import { ConfigProvider } from 'contexts/ConfigContext';
import RTLLayout from 'components/RTLLayout';
import Locales from 'components/Locales';
import ScrollTop from 'components/ScrollTop';

import Notistack from 'components/third-party/Notistack';
import Customization from 'components/customization';
import Snackbar from 'components/@extended/Snackbar';

// ==============================|| PROVIDER WRAPPER  ||============================== //

export default function ProviderWrapper({ children }: { children: ReactElement }) {
  return (
    <ConfigProvider>
      <ThemeCustomization>
        <RTLLayout>
          <Locales>
            <ScrollTop>
              <SessionProvider refetchInterval={0}>
                <Notistack>
                  <Snackbar />
                  {children}
                  <Customization />
                </Notistack>
              </SessionProvider>
            </ScrollTop>
          </Locales>
        </RTLLayout>
      </ThemeCustomization>
    </ConfigProvider>
  );
}
