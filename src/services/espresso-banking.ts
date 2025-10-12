import axios from 'axios';
import { HttpService } from './http-service';

class EspressoBankingService extends HttpService {
  constructor() {
    const baseURL = process.env.REACT_APP_ESPRESSO_BANKING_API_URL;

    if (!baseURL) {
      throw new Error(`[EspressoBankingService] Invalid baseURL "${baseURL}"`);
    }

    super(axios.create({ baseURL }));
  }
}

export const espressoBankingService = new EspressoBankingService();
