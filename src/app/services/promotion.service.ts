import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  getPromotions(): Promise<Promotion[]> {
    return Promise.resolved(PROMOTIONS);
  }

  getPromotion(id: number): Promise<Promotion> {
    return Promise.resolved(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return Promise.resolved(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
  }

  constructor() { }
}
