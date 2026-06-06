export type MotorConfig = {
  name: string;
  bore: string;
  stroke: string;
  cylinders: string;
  isFI?: boolean;
};

export type MotorGroup = {
  category: string;
  motors: MotorConfig[];
};
