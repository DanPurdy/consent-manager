import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import Dialog from './dialog';
import { DefaultButton, GreenButton } from './buttons';
import {
  Destination,
  CustomCategories,
  CategoryPreferences,
  PreferenceDialogTranslations,
} from '../types';

const hideOnMobile = css`
  @media (max-width: 600px) {
    display: none;
  }
`;

const TableScroll = styled.div`
  overflow-x: auto;
  margin-top: 16px;
`;

const Table = styled.table`
  border-collapse: collapse;
  font-size: 12px;
`;

const ColumnHeading = styled.th<{ hideOnMobile?: boolean }>`
  background: #f7f8fa;
  color: #1f4160;
  font-weight: 600;
  text-align: left;
  border-width: 2px;

  ${props => (props.hideOnMobile ? hideOnMobile : '')}
`;

const DesktopOnlyTD = styled.td`
  ${hideOnMobile}
`;

const Row = styled.tr`
  th,
  td {
    vertical-align: top;
    padding: 8px 12px;
    border: 1px solid rgba(67, 90, 111, 0.114);
  }
  td {
    border-top: none;
  }
`;

const InputCell = styled.td`
  input {
    vertical-align: middle;
  }
  label {
    display: block;
    margin-bottom: 4px;
    white-space: nowrap;
  }
`;

interface PreferenceDialogProps {
  onAcceptAll: () => void;
  onSave: () => void;
  onChange: (name: string, value: boolean) => void;
  marketingDestinations: Destination[];
  advertisingDestinations: Destination[];
  functionalDestinations: Destination[];
  marketingAndAnalytics?: boolean | null;
  advertising?: boolean | null;
  functional?: boolean | null;
  customCategories?: CustomCategories;
  destinations: Destination[];
  preferences: CategoryPreferences;
  title: React.ReactNode;
  content: React.ReactNode;
  preferenceDialogTranslations: PreferenceDialogTranslations;
}

export default class PreferenceDialog extends PureComponent<
  PreferenceDialogProps,
  {}
> {
  static displayName = 'PreferenceDialog';

  static defaultProps = {
    marketingAndAnalytics: null,
    advertising: null,
    functional: null,
  };

  render() {
    const {
      onAcceptAll,
      marketingDestinations,
      advertisingDestinations,
      functionalDestinations,
      marketingAndAnalytics,
      advertising,
      functional,
      customCategories,
      destinations,
      title,
      content,
      preferences,
      preferenceDialogTranslations,
    } = this.props;

    const buttons = (
      <div>
        <DefaultButton type="submit">
          {preferenceDialogTranslations.saveButtonText}
        </DefaultButton>
        <GreenButton type="button" onClick={onAcceptAll}>
          {preferenceDialogTranslations.acceptAllButtonText}
        </GreenButton>
      </div>
    );
    return (
      <Dialog title={title} buttons={buttons} onSubmit={this.handleSubmit}>
        {content}
        <TableScroll>
          <Table>
            <thead>
              <Row>
                <ColumnHeading scope="col">
                  {preferenceDialogTranslations.columnAllowHeadingText}
                </ColumnHeading>
                <ColumnHeading scope="col">
                  {preferenceDialogTranslations.columnCategoryHeadingText}
                </ColumnHeading>
                <ColumnHeading scope="col" hideOnMobile>
                  {preferenceDialogTranslations.columnToolsHeadingText}
                </ColumnHeading>
              </Row>
            </thead>

            <tbody>
              {!customCategories && (
                <>
                  <Row>
                    <InputCell>
                      <label>
                        <input
                          type="radio"
                          name="functional"
                          value="true"
                          checked={functional === true}
                          onChange={this.handleChange}
                          aria-label="Allow functional tracking"
                          required
                        />{' '}
                        {preferenceDialogTranslations.radioAcceptText}
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="functional"
                          value="false"
                          checked={functional === false}
                          onChange={this.handleChange}
                          aria-label="Disallow functional tracking"
                          required
                        />{' '}
                        {preferenceDialogTranslations.radioDenyText}
                      </label>
                    </InputCell>
                    <td>
                      <p>{preferenceDialogTranslations.functionalTitleText}</p>
                      <p>
                        {preferenceDialogTranslations.functionalContentText}
                      </p>
                    </td>
                    <DesktopOnlyTD>
                      {functionalDestinations.map(d => d.name).join(', ')}
                    </DesktopOnlyTD>
                  </Row>

                  <Row>
                    <InputCell>
                      <label>
                        <input
                          type="radio"
                          name="marketingAndAnalytics"
                          value="true"
                          checked={marketingAndAnalytics === true}
                          onChange={this.handleChange}
                          aria-label="Allow marketing and analytics tracking"
                          required
                        />{' '}
                        {preferenceDialogTranslations.radioAcceptText}
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="marketingAndAnalytics"
                          value="false"
                          checked={marketingAndAnalytics === false}
                          onChange={this.handleChange}
                          aria-label="Disallow marketing and analytics tracking"
                          required
                        />{' '}
                        {preferenceDialogTranslations.radioDenyText}
                      </label>
                    </InputCell>
                    <td>
                      <p>{preferenceDialogTranslations.marketingTitleText}</p>
                      <p>{preferenceDialogTranslations.marketingContentText}</p>
                    </td>
                    <DesktopOnlyTD>
                      {marketingDestinations.map(d => d.name).join(', ')}
                    </DesktopOnlyTD>
                  </Row>

                  <Row>
                    <InputCell>
                      <label>
                        <input
                          type="radio"
                          name="advertising"
                          value="true"
                          checked={advertising === true}
                          onChange={this.handleChange}
                          aria-label="Allow advertising tracking"
                          required
                        />{' '}
                        {preferenceDialogTranslations.radioAcceptText}
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="advertising"
                          value="false"
                          checked={advertising === false}
                          onChange={this.handleChange}
                          aria-label="Disallow advertising tracking"
                          required
                        />{' '}
                        {preferenceDialogTranslations.radioDenyText}
                      </label>
                    </InputCell>
                    <td>
                      <p>{preferenceDialogTranslations.advertisingTitleText}</p>
                      <p>
                        {preferenceDialogTranslations.advertisingContentText}
                      </p>
                    </td>
                    <DesktopOnlyTD>
                      {advertisingDestinations.map(d => d.name).join(', ')}
                    </DesktopOnlyTD>
                  </Row>
                </>
              )}

              {customCategories &&
                Object.entries(customCategories).map(
                  ([categoryName, { integrations, purpose }]) => (
                    <Row key={categoryName}>
                      <InputCell>
                        <label>
                          <input
                            type="radio"
                            name={categoryName}
                            value="true"
                            checked={preferences[categoryName] === true}
                            onChange={this.handleChange}
                            aria-label={`Allow "${categoryName}" tracking`}
                            required
                          />{' '}
                          {preferenceDialogTranslations.radioAcceptText}
                        </label>
                        <label>
                          <input
                            type="radio"
                            name={categoryName}
                            value="false"
                            checked={preferences[categoryName] === false}
                            onChange={this.handleChange}
                            aria-label={`Disallow "${categoryName}" tracking`}
                            required
                          />{' '}
                          {preferenceDialogTranslations.radioDenyText}
                        </label>
                      </InputCell>
                      <td>
                        <p>{categoryName}</p>
                        <p>{purpose}</p>
                      </td>
                      <DesktopOnlyTD>
                        {destinations
                          .filter(d => integrations.includes(d.id))
                          .map(d => d.name)
                          .join(', ')}
                      </DesktopOnlyTD>
                    </Row>
                  ),
                )}

              <Row>
                <td></td>
                <td>
                  <p>{preferenceDialogTranslations.essentialTitleText}</p>
                  <p>{preferenceDialogTranslations.essentialContentText}</p>
                </td>
                <DesktopOnlyTD />
              </Row>
            </tbody>
          </Table>
        </TableScroll>
      </Dialog>
    );
  }

  handleChange = e => {
    const { onChange } = this.props;
    onChange(e.target.name, e.target.value === 'true');
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const {
      onSave,
      preferences,
      marketingAndAnalytics,
      advertising,
      functional,
      customCategories,
    } = this.props;
    e.preventDefault();
    // Safe guard against browsers that don't prevent the
    // submission of invalid forms (Safari < 10.1)
    if (
      !customCategories &&
      (marketingAndAnalytics === null ||
        advertising === null ||
        functional === null)
    ) {
      return;
    }

    // Safe guard against custom categories being null
    if (
      customCategories &&
      Object.keys(customCategories).some(
        category => preferences[category] === null,
      )
    ) {
      return;
    }
    onSave();
  };
}
