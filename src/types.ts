/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TourPackage {
  title: string;
  desc: string;
  img: string;
  country: string;
  region?: string;
  duration: string;
  destId: string;
  rating: number;
}

export interface ArtItem {
  title: string;
  category: string;
  img: string;
  price?: string;
}

export interface CartItem {
  qty: number;
  img: string;
}

export interface Cart {
  [title: string]: CartItem;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface DestinationInfo {
  title: string;
  desc: string;
  img: string;
  faqs?: FAQ[];
}

export interface DestinationsDict {
  [destId: string]: DestinationInfo;
}
