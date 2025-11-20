describe('Jest Setup', () => {
  it('should run tests correctly', () => {
    expect(true).toBe(true);
  });

  it('should have access to jest-dom matchers', () => {
    if (typeof document === 'undefined') {
      console.warn('Skipping jsdom test - document is not available (likely running with bun test)');
      return;
    }

    expect(typeof document).not.toBe('undefined');
    expect(typeof window).not.toBe('undefined');

    const element = document.createElement('div');
    element.textContent = 'Hello World';
    document.body.appendChild(element);

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Hello World');

    document.body.removeChild(element);
  });
});

