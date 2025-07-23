import { test, expect } from '@playwright/test';
import { log } from 'console';

//valid username and password
/*test('OrangeHRMLogin' , async({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await expect(page).toHaveTitle('OrangeHRM')
    await page.getByPlaceholder('Username').fill('Admin')
    await page.getByPlaceholder('Password').fill('admin123')
    await page.getByRole("button", {name:'Login'}).click()

})*/

//invalid password
test('InvalidLogin', async({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByPlaceholder('Username').fill('Admin')
    await page.getByPlaceholder('Password').fill('wrongPassword123')
    await page.getByRole("button",{name: 'Login'}).click()

    const errorMessage = page.locator('.oxd-text.oxd-text--p.oxd-alert-content-text')
    await page.waitForTimeout(2000)
    const errorVisible = await errorMessage.first().isVisible();
    console.log('Error message visible?', errorVisible);

    if (errorVisible) {
        console.log('Login failed. Proceeding to Forgot Password.')
        await page.getByText("Forgot your password?").click()
        await page.getByPlaceholder('Username').fill('Admin')
        await page.getByRole("button",{name:'Reset Password'}).click()
        await page.waitForTimeout(10000);
    } 
    else{console.log('Login successful — no error message appeared.') 
    }    

})