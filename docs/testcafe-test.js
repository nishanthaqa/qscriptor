import { Selector } from 'testcafe';

fixture `Login to localhost:8080`
    .page(`http://localhost:8080`);

test('Login Test', async (t) => {
    // Locate the username input field and fill it with the desired value
    await t.typeText(Selector('#username'), 'your_username', { paste: false });

    // Locate the password input field and fill it with the desired value
    await t.typeText(Selector('#password'), 'your_password', { paste: false });

    // Click the login button
    await t.click(Selector('button[type="submit"]'));

    // Verify that you are on the dashboard page (you can modify this based on your expected outcome)
    await t.expect(Selector('.dashboard').exists).ok();
});