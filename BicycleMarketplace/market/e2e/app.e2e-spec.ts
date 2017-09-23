import { MarketPage } from './app.po';

describe('market App', () => {
  let page: MarketPage;

  beforeEach(() => {
    page = new MarketPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
