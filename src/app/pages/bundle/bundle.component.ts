import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface BundleOption {
  title: string;
  price: string;
  originalPrice: string;
  discount: string;
  description?: string[];
}

@Component({
  selector: 'app-bundle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bundle.component.html',
})
export class BundleComponent {
  readonly outboundBundles: BundleOption[] = [
    {
      title: 'ที่นั่ง + บริการพิเศษ',
      price: '536.00 THB',
      originalPrice: '679.00 THB',
      discount: '-15%',
      description: [
        'เลือกที่นั่งได้ตามใจ',
        'สิทธิ์กับบินเต็มจำนวนเมื่อเปลี่ยนแผน',
        'สิทธิ์กับบินเต็มจำนวนเมื่อเปลี่ยนแผน',
      ],
    },
    {
      title: 'กระเป๋า + บริการพิเศษ',
      price: '595.00 THB',
      originalPrice: '700.00 THB',
      discount: '-15%',
    },
    {
      title: 'กระเป๋า + ที่นั่ง',
      price: '722.50 THB',
      originalPrice: '850.00 THB',
      discount: '-15%',
    },
    {
      title: 'กระเป๋า + ที่นั่ง + บริการพิเศษ',
      price: '892.50 THB',
      originalPrice: '1,050.00 THB',
      discount: '-15%',
    },
    {
      title: 'กระเป๋า + ที่นั่ง + ห้องรับรองพิเศษ',
      price: '1,232.50 THB',
      originalPrice: '1,450.00 THB',
      discount: '-15%',
    },
  ];

  readonly returnBundles: BundleOption[] = [...this.outboundBundles];

  selectedOutbound = 0;
  selectedReturn = 0;
}
