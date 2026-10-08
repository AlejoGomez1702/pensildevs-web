import type { IconName } from '../../shared/ui/icon';
import { PENSIL_POS } from './pensil-pos.content';

export interface ProductSummary {
  readonly slug: string;
  readonly name: string;
  readonly category: string;
  readonly icon: IconName;
  readonly tagline: string;
}

/** Every product Pensil.Devs offers. Navigation, footer and `/productos` are built from this list. */
export const PRODUCT_CATALOG: readonly ProductSummary[] = [
  {
    slug: PENSIL_POS.slug,
    name: PENSIL_POS.name,
    category: 'Punto de venta',
    icon: 'receipt',
    tagline: PENSIL_POS.tagline,
  },
];
