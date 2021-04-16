import EventEmitter from 'events';
import React from 'react';
import Banner from './banner';
import PreferenceDialog from './preference-dialog';
import { ADVERTISING_CATEGORIES, FUNCTIONAL_CATEGORIES } from './categories';
import {
  Destination,
  CategoryPreferences,
  CustomCategories,
  DefaultDestinationBehavior,
  PreferenceDialogTranslations,
} from '../types';

const emitter = new EventEmitter();
export function openDialog() {
  emitter.emit('openDialog');
}

export const enum CloseBehavior {
  ACCEPT = 'accept',
  DENY = 'deny',
}

export interface CloseBehaviorFunction {
  (categories: CategoryPreferences): CategoryPreferences;
}

interface ContainerProps {
  setPreferences: (prefs: CategoryPreferences) => void;
  saveConsent: (
    newPreferences?: CategoryPreferences,
    shouldReload?: boolean,
  ) => void;
  resetPreferences: () => void;
  closeBehavior?: CloseBehavior | CloseBehaviorFunction;
  destinations: Destination[];
  customCategories?: CustomCategories | undefined;
  newDestinations: Destination[];
  preferences: CategoryPreferences;
  havePreferencesChanged: boolean;
  isConsentRequired: boolean;
  implyConsentOnInteraction: boolean;
  bannerContent: React.ReactNode;
  bannerAcceptButtonContent: React.ReactNode;
  bannerSettingsButtonContent: React.ReactNode;
  bannerTextColor: string;
  bannerBackgroundColor: string;
  preferencesDialogTitle: React.ReactNode;
  preferencesDialogContent: React.ReactNode;
  cancelDialogTitle: React.ReactNode;
  cancelDialogContent: React.ReactNode;
  workspaceAddedNewDestinations?: boolean;
  defaultDestinationBehavior?: DefaultDestinationBehavior;
  preferenceDialogTranslations: PreferenceDialogTranslations;
}

function normalizeDestinations(destinations: Destination[]) {
  const marketingDestinations: Destination[] = [];
  const advertisingDestinations: Destination[] = [];
  const functionalDestinations: Destination[] = [];

  for (const destination of destinations) {
    if (ADVERTISING_CATEGORIES.find(c => c === destination.category)) {
      advertisingDestinations.push(destination);
    } else if (FUNCTIONAL_CATEGORIES.find(c => c === destination.category)) {
      functionalDestinations.push(destination);
    } else {
      // Fallback to marketing
      marketingDestinations.push(destination);
    }
  }

  return {
    marketingDestinations,
    advertisingDestinations,
    functionalDestinations,
  };
}

const Container: React.FC<ContainerProps> = props => {
  const [isDialogOpen, toggleDialog] = React.useState(
    false ||
      (props.workspaceAddedNewDestinations &&
        props.defaultDestinationBehavior === 'ask'),
  );
  const [showBanner, toggleBanner] = React.useState(true);

  const {
    marketingDestinations,
    advertisingDestinations,
    functionalDestinations,
  } = normalizeDestinations(props.destinations);

  React.useEffect(() => {
    if (isDialogOpen) {
      props.resetPreferences();
    }
  }, [isDialogOpen]);

  const handleCategoryChange = (category: string, value: boolean) => {
    props.setPreferences({
      [category]: value,
    });
  };

  const handleSave = () => {
    toggleDialog(false);

    props.setPreferences(props.preferences);
    props.saveConsent();
  };

  const onAcceptAll = () => {
    const newPrefs = { ...props.preferences };
    if (props.preferences) {
      Object.keys(props.preferences).forEach(
        prefKey => (newPrefs[prefKey] = true),
      );
    }

    props.setPreferences(newPrefs);

    props.saveConsent();

    toggleBanner(false);
    toggleDialog(false);
  };

  return (
    <div>
      {showBanner &&
        props.isConsentRequired &&
        props.newDestinations.length > 0 && (
          <Banner
            onAcceptAllPreferences={onAcceptAll}
            onChangePreferences={() => toggleDialog(true)}
            content={props.bannerContent}
            acceptButtonContent={props.bannerAcceptButtonContent}
            settingsButtonContent={props.bannerSettingsButtonContent}
            textColor={props.bannerTextColor}
            backgroundColor={props.bannerBackgroundColor}
          />
        )}

      {isDialogOpen && (
        <PreferenceDialog
          onAcceptAll={onAcceptAll}
          customCategories={props.customCategories}
          destinations={props.destinations}
          preferences={props.preferences}
          onSave={handleSave}
          onChange={handleCategoryChange}
          marketingDestinations={marketingDestinations}
          advertisingDestinations={advertisingDestinations}
          functionalDestinations={functionalDestinations}
          marketingAndAnalytics={props.preferences.marketingAndAnalytics}
          advertising={props.preferences.advertising}
          functional={props.preferences.functional}
          title={props.preferencesDialogTitle}
          content={props.preferencesDialogContent}
          preferenceDialogTranslations={props.preferenceDialogTranslations}
        />
      )}
    </div>
  );
};

export default Container;
