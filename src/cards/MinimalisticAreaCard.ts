// noinspection JSUnusedGlobalSymbols Class is dynamically imported.

import AbstractCard from './AbstractCard';
import { LovelaceCardConfig } from '../types/homeassistant/data/lovelace/config/card';
import { AbstractCardConfig } from '../types/strategy/strategy-cards';
import { StrategyArea } from '../types/strategy/strategy-generics';

/**
 * Minimalistic Area Card Class
 *
 * Renders an area entry using the bundled `custom:mushroom-strategy-area-card`
 * (a fork of junalmeida/homeassistant-minimalistic-area-card, registered as a
 * different element name so it doesn't clash with a HACS install of the
 * original). Used when the strategy's `areas` option declares
 * `type: MinimalisticAreaCard`. User-supplied fields (entity, entities,
 * camera_image, card_mod, etc.) pass through.
 */
class MinimalisticAreaCard extends AbstractCard {
  /** Returns the default configuration object for the card. */
  static getDefaultConfig(): LovelaceCardConfig {
    return {
      type: 'custom:mushroom-strategy-area-card',
      tap_action: { action: 'navigate', navigation_path: '' },
    };
  }

  /**
   * Class constructor.
   *
   * @param {StrategyArea} area The HASS area to create a card configuration for.
   * @param {LovelaceCardConfig} [customConfiguration] Custom card configuration (merged areas._ + areas[area_id]).
   */
  constructor(area: StrategyArea, customConfiguration?: LovelaceCardConfig) {
    super(area);

    const configuration = MinimalisticAreaCard.getDefaultConfig();

    if (configuration.tap_action && 'navigation_path' in configuration.tap_action) {
      configuration.tap_action.navigation_path = area.area_id;
    }

    this.configuration = {
      ...this.configuration,
      ...configuration,
      ...customConfiguration,
      type: configuration.type,
    };
  }

  /**
   * Get a card configuration.
   *
   * `minimalistic-area-card` uses `entity` from the user's config — don't override it with
   * the area registry (which has no entity_id and would clobber the user's value with undefined).
   */
  getCard(): AbstractCardConfig {
    return { ...this.configuration };
  }
}

export default MinimalisticAreaCard;
