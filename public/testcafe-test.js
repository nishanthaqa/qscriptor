import { Selector } from 'testcafe';

fixture `Login Test`
    .page `http://localhost:8080`;

test('Login with valid credentials', async (t) => {
    // Find the username input field and enter the login name
    await t.typeText(Selector('#username'), 'your_username', { paste: true });

    // Find the password input field and enter the password
    await t.typeText(Selector('#password'), 'your_password', { paste: true });

    // Click the login button
    await t.click(Selector('#login-button'));

    // Assert that we are redirected to the dashboard or any specific page after a successful login
    await t.expect(Selector('.dashboard').exists).ok();
});