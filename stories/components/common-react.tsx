import React from 'react';
import { PreferenceDialogTranslations } from '../../src/types';

export const bannerContent = (
  <span>
    We use cookies (and other similar technologies) to collect data to improve
    your experience on our site. By using our website, you’re agreeing to the
    collection of data as described in our{' '}
    <a
      href="https://segment.com/docs/legal/website-data-collection-policy/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Website Data Collection Policy
    </a>
    .
  </span>
);
export const bannerAcceptButtonContent = 'Yes, I agree';
export const bannerSettingsButtonContent = 'No, take me to settings';
export const preferencesDialogTitle = 'Website Data Collection Preferences';
export const preferencesDialogContent = (
  <div>
    <p>
      Segment uses data collected by cookies and JavaScript libraries to improve
      your browsing experience, analyze site traffic, deliver personalized
      advertisements, and increase the overall performance of our site.
    </p>
    <p>
      By using our website, you’re agreeing to our{' '}
      <a
        href="https://segment.com/docs/legal/website-data-collection-policy/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Website Data Collection Policy
      </a>
      .
    </p>
    <p>
      The table below outlines how we use this data by category. To opt out of a
      category of data collection, select “No” and save your preferences.
    </p>
  </div>
);
export const cancelDialogTitle = 'Are you sure you want to cancel?';
export const cancelDialogContent = (
  <div>
    Your preferences have not been saved. By continuing to use our website,
    you’re agreeing to our{' '}
    <a
      href="https://segment.com/docs/legal/website-data-collection-policy/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Website Data Collection Policy
    </a>
    .
  </div>
);

export const preferenceDialogTranslations = {
  acceptAllButtonText: 'Accept All',
  saveButtonText: 'Save & Exit',
  radioAcceptText: 'Yes',
  radioDenyText: 'No',
  columnAllowHeadingText: 'Allow',
  columnCategoryHeadingText: 'Category and Purpose',
  columnToolsHeadingText: 'Tools',
  functionalTitleText: 'Functional',
  functionalContentText:
    'To monitor the performance of our site and to enhance your browsing experience. For example, these tools enable you to communicate with us via live chat.',
  marketingTitleText: 'Marketing and Analytics',
  marketingContentText: `To understand user behavior in order to provide you with
  a more relevant browsing experience or personalize the
  content on our site. For example, we collect information
  about which pages you visit to help us present more
  relevant information.`,
  advertisingTitleText: 'Advertising',
  advertisingContentText:
    'To personalize and measure the effectiveness of advertising on our site and other websites. For example, we may serve you a personalized ad based on the pages you visit on our site.',
  essentialTitleText: 'Essential',
  essentialContentText:
    'We use browser cookies that are necessary for the site to work as intended. For example, we store your website data collection preferences so we can honor them if you return to our site. You can disable these cookies in your browser settings but if you do the site may not work as intended.',
} as PreferenceDialogTranslations;
