import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';


@Injectable()
export class PaytmChecksum {

    private key_in_bytes = Buffer.from('hdshajksdahuuiefsdhsfhjfdskh', 'base64')


  async encrypt(input: string, key: string): Promise<string> {
    console.log("🚀 ~ PaytmChecksum ~ encrypt ~ key:", key)
    const cipher = crypto.createCipher('aes-128-cbc', key);
    let encrypted = cipher.update(input, 'utf-8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  }

   decrypt(encrypted: string, key: string): string {
    const decipher = crypto.createDecipheriv('AES-128-CBC', key, Buffer.from(this.key_in_bytes));
    let decrypted = decipher.update(encrypted, 'base64', 'binary');
    try {
      decrypted += decipher.final('binary');
    } catch (e) {
      console.log(e);
    }
    return decrypted;
  }

  async generateSignature(params: string , key: string): Promise<string> {
    if (typeof params !== 'object' && typeof params !== 'string') {
      const error = `string or object expected, ${typeof params} given.`;
      return Promise.reject(error);
    }
    if (typeof params !== 'string') {
      params = this.getStringByParams(params);
    }
    return this.generateSignatureByString(params, key);
  }

  async verifySignature(params: any, key: string, checksum: string): Promise<boolean> {
    if (typeof params !== 'object' && typeof params !== 'string') {
      const error = `string or object expected, ${typeof params} given.`;
      return Promise.reject(error);
    }
    if (params.hasOwnProperty('CHECKSUMHASH')) {
      delete params.CHECKSUMHASH;
    }
    if (typeof params !== 'string') {
      params = this.getStringByParams(params);
    }
    return await this.verifySignatureByString(params, key, checksum);
  }

   async generateSignatureByString(params: string, key: string): Promise<string> {
    const salt = await this.generateRandomString(4);
    return this.calculateChecksum(params, key, salt);
  }

  async verifySignatureByString(params: string, key: string, checksum: string): Promise<boolean> {
    const paytm_hash = this.decrypt(checksum, key);
    const salt = paytm_hash.substr(paytm_hash.length - 4);
    return paytm_hash === this.calculateHash(params, salt);
  }

  async generateRandomString(length: number): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.randomBytes((length * 3.0) / 4.0, (err, buf) => {
        if (!err) {
          const salt = buf.toString('base64');
          resolve(salt);
        } else {
          console.log(`Error occurred in generateRandomString: ${err}`);
          reject(err);
        }
      });
    });
  }

   getStringByParams(params: Record<string, any>): string {
    const data: Record<string, any> = {};
    Object.keys(params)
      .sort()
      .forEach((key) => {
        data[key] = params[key] !== null && params[key].toLowerCase() !== null ? params[key] : '';
      });
    return Object.values(data).join('|');
  }

  calculateHash(params: string, salt: string): string {
    const finalString = `${params}|${salt}`;
    return crypto.createHash('sha256').update(finalString).digest('hex') + salt;
  }

  async calculateChecksum(params: string, key: string, salt: string): Promise<string> {
    const hashString = this.calculateHash(params, salt);
    return this.encrypt(hashString, key);
  }
}

