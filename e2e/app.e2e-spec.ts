import { Project00Page } from './app.po';

describe('project-00 App', function() {
  let page: Project00Page;

  beforeEach(() => {
    page = new Project00Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
