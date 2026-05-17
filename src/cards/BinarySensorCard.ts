// noinspection JSUnusedGlobalSymbols Class is dynamically imported.

import { EntityRegistryEntry } from '../types/homeassistant/data/entity_registry';
import { LovelaceCardConfig } from '../types/homeassistant/data/lovelace/config/card';
import { AbstractCardConfig } from '../types/strategy/strategy-cards';
import AbstractCard from './AbstractCard';

/**
 * Binary Sensor Card Class
 *
 * Renders a binary_sensor entity as a Mushroom Chips card containing a single entity chip.
 */
class BinarySensorCard extends AbstractCard {
  /** Returns the default configuration object for the card. */
  static getDefaultConfig(): LovelaceCardConfig {
    return {
      type: 'custom:mushroom-chips-card',
      chips: [
        {
          type: 'entity',
          entity: '',
          content_info: 'name',
          icon_color: 'green',
          use_entity_picture: true,
        },
      ],
      alignment: 'center',
      grid_options: {
        columns: 'full',
        rows: 'auto',
      },
    };
  }

  /**
   * Class constructor.
   *
   * @param {EntityRegistryEntry} entity The HASS entity to create a card configuration for.
   * @param {LovelaceCardConfig} [customConfiguration] Custom card configuration.
   */
  constructor(entity: EntityRegistryEntry, customConfiguration?: LovelaceCardConfig) {
    super(entity);

    this.configuration = { ...this.configuration, ...BinarySensorCard.getDefaultConfig(), ...customConfiguration };
  }

  /**
   * Get a card configuration.
   *
   * The chips card doesn't take a top-level `entity` — inject the entity_id into the first chip instead.
   */
  getCard(): AbstractCardConfig {
    const entityId = 'entity_id' in this.entity ? this.entity.entity_id : undefined;
    const chips = Array.isArray(this.configuration.chips) ? [...this.configuration.chips] : [];

    if (chips.length > 0 && entityId) {
      chips[0] = { ...chips[0], entity: entityId };
    }

    return { ...this.configuration, chips };
  }
}

export default BinarySensorCard;
