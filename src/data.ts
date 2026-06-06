import { MotorGroup } from './types';

export const presetMotorGroups: MotorGroup[] = [
  {
    category: 'Manual',
    motors: [
      { name: 'Pilih Motor / Ketik Manual...', bore: '58', stroke: '58', cylinders: '1' }
    ]
  },
  {
    category: 'Honda - Matic & Bebek (1 Silinder)',
    motors: [
      { name: 'Honda Beat / Scoopy / Genio (eSP)', bore: '47', stroke: '63.1', cylinders: '1', isFI: true },
      { name: 'Honda Beat / Scoopy (Karbu/FI Lama)', bore: '50', stroke: '55.1', cylinders: '1', isFI: false },
      { name: 'Honda Vario 125', bore: '52.4', stroke: '57.9', cylinders: '1', isFI: true },
      { name: 'Honda Vario 150 / PCX 150 / ADV 150', bore: '57.3', stroke: '57.9', cylinders: '1', isFI: true },
      { name: 'Honda Vario 160 / PCX 160 / ADV 160', bore: '60', stroke: '55.5', cylinders: '1', isFI: true },
      { name: 'Honda Supra X 125 / Karisma', bore: '52.4', stroke: '57.9', cylinders: '1', isFI: false },
      { name: 'Honda Supra GTR 150 / Sonic 150R', bore: '57.3', stroke: '57.8', cylinders: '1', isFI: true },
      { name: 'Honda Astrea Grand / Supra X 100', bore: '50', stroke: '49.5', cylinders: '1', isFI: false },
    ]
  },
  {
    category: 'Honda - Sport',
    motors: [
      { name: 'Honda CRF150L / Megapro / Verza', bore: '57.3', stroke: '57.8', cylinders: '1', isFI: true },
      { name: 'Honda CBR150R / CB150R (K45)', bore: '57.3', stroke: '57.8', cylinders: '1', isFI: true },
      { name: 'Honda Tiger 2000 / Revo', bore: '63.5', stroke: '62.2', cylinders: '1', isFI: false },
      { name: 'Honda CBR250RR (2 Silinder)', bore: '62', stroke: '41.4', cylinders: '2', isFI: true },
      { name: 'Honda CBR500R / Rebel 500 (2 Silinder)', bore: '67', stroke: '66.8', cylinders: '2', isFI: true },
      { name: 'Honda CBR600RR (4 Silinder)', bore: '67', stroke: '42.5', cylinders: '4', isFI: true },
      { name: 'Honda CBR1000RR-R (4 Silinder)', bore: '81', stroke: '48.5', cylinders: '4', isFI: true },
    ]
  },
  {
    category: 'Yamaha - Matic & Bebek (1 Silinder)',
    motors: [
      { name: 'Yamaha Mio Sporty / Smile (Karbu)', bore: '50', stroke: '57.9', cylinders: '1', isFI: false },
      { name: 'Yamaha Mio J / Soul GT 115 / Fino 115', bore: '50', stroke: '57.9', cylinders: '1', isFI: true },
      { name: 'Yamaha Mio M3 / Soul GT 125 / Gear 125', bore: '52.4', stroke: '57.9', cylinders: '1', isFI: true },
      { name: 'Yamaha NMAX 155 / Aerox / Lexi 155', bore: '58', stroke: '58.7', cylinders: '1', isFI: true },
      { name: 'Yamaha XMAX 250', bore: '70', stroke: '64.9', cylinders: '1', isFI: true },
      { name: 'Yamaha Jupiter Z 110 (Burhan)', bore: '51', stroke: '54', cylinders: '1', isFI: false },
      { name: 'Yamaha Jupiter Z1 115', bore: '50', stroke: '57.9', cylinders: '1', isFI: true },
      { name: 'Yamaha Jupiter MX 135', bore: '54', stroke: '58.7', cylinders: '1', isFI: false },
      { name: 'Yamaha MX King 150', bore: '57', stroke: '58.7', cylinders: '1', isFI: true },
      { name: 'Yamaha RX King 135 (2-Tak)', bore: '58', stroke: '50', cylinders: '1', isFI: false },
      { name: 'Yamaha F1ZR 110 (2-Tak)', bore: '52', stroke: '52', cylinders: '1', isFI: false },
    ]
  },
  {
    category: 'Yamaha - Sport',
    motors: [
      { name: 'Yamaha Vixion Lama / NVL / NVA', bore: '57', stroke: '58.7', cylinders: '1', isFI: true },
      { name: 'Yamaha R15 V2', bore: '57', stroke: '58.7', cylinders: '1', isFI: true },
      { name: 'Yamaha R15 V3 / V4 / MT-15 / WR155', bore: '58', stroke: '58.7', cylinders: '1', isFI: true },
      { name: 'Yamaha Scorpio Z 225', bore: '70', stroke: '58', cylinders: '1', isFI: false },
      { name: 'Yamaha R25 / MT-25 (2 Silinder)', bore: '60', stroke: '44.1', cylinders: '2', isFI: true },
      { name: 'Yamaha R3 / MT-03 (2 Silinder)', bore: '68', stroke: '44.1', cylinders: '2', isFI: true },
      { name: 'Yamaha TMAX 560 (2 Silinder)', bore: '70', stroke: '73', cylinders: '2', isFI: true },
      { name: 'Yamaha MT-07 (2 Silinder)', bore: '80', stroke: '68.6', cylinders: '2', isFI: true },
      { name: 'Yamaha MT-09 / XSR900 (3 Silinder)', bore: '78', stroke: '62.1', cylinders: '3', isFI: true },
      { name: 'Yamaha R6 (4 Silinder)', bore: '67', stroke: '42.5', cylinders: '4', isFI: true },
      { name: 'Yamaha R1 (4 Silinder)', bore: '79', stroke: '50.9', cylinders: '4', isFI: true },
    ]
  },
  {
    category: 'Kawasaki',
    motors: [
      { name: 'Kawasaki KLX 150 / D-Tracker', bore: '58', stroke: '54.4', cylinders: '1', isFI: false },
      { name: 'Kawasaki W175', bore: '65.5', stroke: '52.4', cylinders: '1', isFI: false },
      { name: 'Kawasaki Ninja 150 RR/R (2-Tak)', bore: '59', stroke: '54.4', cylinders: '1', isFI: false },
      { name: 'Kawasaki Ninja 250SL / RR Mono', bore: '72', stroke: '61.2', cylinders: '1', isFI: true },
      { name: 'Kawasaki Ninja 250 FI / Z250 (2 Silinder)', bore: '62', stroke: '41.2', cylinders: '2', isFI: true },
      { name: 'Kawasaki Ninja 650 / ER-6n (2 Silinder)', bore: '83', stroke: '60', cylinders: '2', isFI: true },
      { name: 'Kawasaki ZX-25R (4 Silinder)', bore: '50', stroke: '31.8', cylinders: '4', isFI: true },
      { name: 'Kawasaki ZX-4RR (4 Silinder)', bore: '57', stroke: '39.1', cylinders: '4', isFI: true },
      { name: 'Kawasaki ZX-6R (4 Silinder)', bore: '67', stroke: '45.1', cylinders: '4', isFI: true },
      { name: 'Kawasaki ZX-10R (4 Silinder)', bore: '76', stroke: '55', cylinders: '4', isFI: true },
    ]
  },
  {
    category: 'Suzuki',
    motors: [
      { name: 'Suzuki Smash / Shogun 110', bore: '53.5', stroke: '48.8', cylinders: '1', isFI: false },
      { name: 'Suzuki Shogun 125 / SP', bore: '53.5', stroke: '55.2', cylinders: '1', isFI: false },
      { name: 'Suzuki Satria FU 150 (Karbu/FI)', bore: '62', stroke: '48.8', cylinders: '1', isFI: false },
      { name: 'Suzuki GSX-R150 / GSX-S150', bore: '62', stroke: '48.8', cylinders: '1', isFI: true },
      { name: 'Suzuki Inazuma 250 (2 Silinder)', bore: '53.5', stroke: '55.2', cylinders: '2', isFI: true },
      { name: 'Suzuki GSX-R600 (4 Silinder)', bore: '67', stroke: '42.5', cylinders: '4', isFI: true },
      { name: 'Suzuki GSX-R1000 (4 Silinder)', bore: '76', stroke: '55.1', cylinders: '4', isFI: true },
      { name: 'Suzuki Hayabusa 1300 (4 Silinder)', bore: '81', stroke: '65', cylinders: '4', isFI: true },
    ]
  },
  {
    category: 'KTM & Husqvarna',
    motors: [
      { name: 'KTM Duke 200 / RC 200', bore: '72', stroke: '49', cylinders: '1', isFI: true },
      { name: 'KTM Duke 250 / RC 250', bore: '72', stroke: '61.1', cylinders: '1', isFI: true },
      { name: 'KTM Duke 390 / RC 390', bore: '89', stroke: '60', cylinders: '1', isFI: true },
      { name: 'KTM 790 Duke (2 Silinder)', bore: '88', stroke: '65.7', cylinders: '2', isFI: true },
      { name: 'KTM 1290 Super Duke R (2 Silinder)', bore: '108', stroke: '71', cylinders: '2', isFI: true },
    ]
  },
  {
    category: 'Eropa & Moge Lainnya',
    motors: [
      { name: 'Aprilia RS 660 (2 Silinder)', bore: '81', stroke: '63.9', cylinders: '2', isFI: true },
      { name: 'Aprilia RSV4 (4 Silinder V4)', bore: '81', stroke: '52.3', cylinders: '4', isFI: true },
      { name: 'BMW G310R / G310GS', bore: '80', stroke: '62.1', cylinders: '1', isFI: true },
      { name: 'BMW S1000RR (4 Silinder)', bore: '80', stroke: '49.7', cylinders: '4', isFI: true },
      { name: 'Ducati Panigale V2 (2 Silinder)', bore: '100', stroke: '60.8', cylinders: '2', isFI: true },
      { name: 'Ducati Panigale V4 (4 Silinder V4)', bore: '81', stroke: '53.5', cylinders: '4', isFI: true },
      { name: 'Triumph Daytona 675 (3 Silinder)', bore: '76', stroke: '49.6', cylinders: '3', isFI: true },
      { name: 'Triumph Street Triple 765 (3 Silinder)', bore: '78', stroke: '53.4', cylinders: '3', isFI: true },
    ]
  }
];
