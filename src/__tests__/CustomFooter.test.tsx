// src/__tests__/CustomFooter.test.tsx

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import CustomFooter from '../Layout/CustomFooter';
import { messages } from '../locales';

describe('CustomFooter', () => {
  it('renders footer content correctly in English', () => {
    render(
      <IntlProvider locale='en' messages={messages.en}>
        <CustomFooter />
      </IntlProvider>
    );

    expect(screen.getByText('Site Map and Features')).toBeInTheDocument();
    expect(
      screen.getByText(
        "Our platform is structured to provide a seamless experience across various functionalities. Here's an overview:"
      )
    ).toBeInTheDocument();
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Admin Panel')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Explore')).toBeInTheDocument();
  });

  it('renders footer content correctly in Chinese', () => {
    render(
      <IntlProvider locale='zh' messages={messages.zh}>
        <CustomFooter />
      </IntlProvider>
    );

    expect(screen.getByText('站点地图和功能')).toBeInTheDocument();
    expect(
      screen.getByText('我们的平台结构化以提供无缝的各种功能体验。以下是概述：')
    ).toBeInTheDocument();
    expect(screen.getByText('通用')).toBeInTheDocument();
    expect(screen.getByText('管理面板')).toBeInTheDocument();
    expect(screen.getByText('仪表板')).toBeInTheDocument();
    expect(screen.getByText('探索')).toBeInTheDocument();
  });
});
