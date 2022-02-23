export interface Player {
  _id: string;
  name: string;
  position: string;
  thumbnail: string;
  signin: {
    amount: {
      $numberInt: string;
    };
    currency: string;
  };
  born: string;
}
