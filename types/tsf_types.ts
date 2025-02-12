export type TTSF_UserData = {
  uid: string;
  phone: string;
  dob: Date;
  isWaiverSigned: boolean;
  firstName: string;
  lastName: string;
  photo: string;
  isSubscribed: boolean;
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
};

export type TTSF_CheckIn = {
  location: string;
  date: Date;
  wasIdGenerated: boolean;
  checkinId: string;
  doorOpened: boolean;
  isOneTimePayment?: boolean;
  oneTimePaymentId?: string;
  // faceVerified: boolean;
  // timeOfExit: Date;
};

export type TTSF_Payment = {
  amount: number;
  currency: string;
  payment_status: string;
  status: string;
  date: Date;
  location: string;
  pricing: string;
  payid: string;
};

export type TTSF_Pricing = "one-time-use" | "subscription";
