
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

export interface ScrapedNGOData {
  organizationName?: string;
  mission?: string;
  vision?: string;
  programs?: string[];
  achievements?: string[];
  leadership?: string[];
  contactInfo?: {
    address?: string;
    phone?: string;
    email?: string;
  };
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  impactNumbers?: string[];
  testimonials?: string[];
}

export class NGOWebScraper {
  async scrapeNGOWebsite(url: string): Promise<ScrapedNGOData> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const html = await response.text();
      const $ = cheerio.load(html);
      
      const scrapedData: ScrapedNGOData = {};
      
      // Extract organization name
      scrapedData.organizationName = this.extractText($, [
        'h1', '.organization-name', '.logo-text', 'title'
      ]);
      
      // Extract mission and vision
      scrapedData.mission = this.extractText($, [
        '.mission', '[class*="mission"]', 'p:contains("mission")', 
        'div:contains("Mission")', 'section:contains("Mission")'
      ]);
      
      scrapedData.vision = this.extractText($, [
        '.vision', '[class*="vision"]', 'p:contains("vision")',
        'div:contains("Vision")', 'section:contains("Vision")'
      ]);
      
      // Extract programs
      scrapedData.programs = this.extractMultipleTexts($, [
        '.program', '.service', '.initiative', '[class*="program"]',
        'li:contains("Program")', 'div:contains("Program")'
      ]);
      
      // Extract achievements/impact numbers
      scrapedData.achievements = this.extractMultipleTexts($, [
        '.achievement', '.impact', '.statistic', '[class*="stat"]',
        '.counter', '.number', '[class*="impact"]'
      ]);
      
      scrapedData.impactNumbers = this.extractNumbers($, [
        '.counter', '.statistic', '.impact-number', '[class*="count"]'
      ]);
      
      // Extract leadership team
      scrapedData.leadership = this.extractMultipleTexts($, [
        '.team-member', '.leadership', '.board-member', '[class*="team"]'
      ]);
      
      // Extract contact information
      scrapedData.contactInfo = {
        address: this.extractText($, [
          '.address', '[class*="address"]', 'address'
        ]),
        phone: this.extractText($, [
          'a[href^="tel:"]', '.phone', '[class*="phone"]'
        ]),
        email: this.extractText($, [
          'a[href^="mailto:"]', '.email', '[class*="email"]'
        ])
      };
      
      // Extract social media links
      scrapedData.socialLinks = {
        facebook: $('a[href*="facebook.com"]').attr('href'),
        twitter: $('a[href*="twitter.com"]').attr('href'),
        instagram: $('a[href*="instagram.com"]').attr('href'),
        linkedin: $('a[href*="linkedin.com"]').attr('href')
      };
      
      // Extract testimonials
      scrapedData.testimonials = this.extractMultipleTexts($, [
        '.testimonial', '.review', '.quote', '[class*="testimonial"]'
      ]);
      
      return scrapedData;
      
    } catch (error) {
      console.error('Error scraping website:', error);
      throw new Error(`Failed to scrape website: ${error.message}`);
    }
  }
  
  private extractText($: cheerio.CheerioAPI, selectors: string[]): string | undefined {
    for (const selector of selectors) {
      const element = $(selector).first();
      if (element.length > 0) {
        return element.text().trim();
      }
    }
    return undefined;
  }
  
  private extractMultipleTexts($: cheerio.CheerioAPI, selectors: string[]): string[] {
    const results: string[] = [];
    
    for (const selector of selectors) {
      $(selector).each((_, element) => {
        const text = $(element).text().trim();
        if (text && !results.includes(text)) {
          results.push(text);
        }
      });
    }
    
    return results.slice(0, 10); // Limit to 10 items
  }
  
  private extractNumbers($: cheerio.CheerioAPI, selectors: string[]): string[] {
    const results: string[] = [];
    
    for (const selector of selectors) {
      $(selector).each((_, element) => {
        const text = $(element).text().trim();
        const numbers = text.match(/\d+[\d,]*\+?/g);
        if (numbers) {
          results.push(...numbers);
        }
      });
    }
    
    return [...new Set(results)].slice(0, 8); // Remove duplicates and limit
  }
}
