import {test, expect} from '@playwright/test'
test.beforeEach(async({page}, testInfo) => {
    //await page.goto('http://www.uitestingplayground.com/ajax')
    await page.goto(process.env.URL)

    await page.getByRole('button', {name: 'Button Triggering AJAX Request'}).click()
    testInfo.setTimeout(testInfo.timeout + 2000)
})

test('auto waiting', async ({page}) => {
    const successButton = page.locator('.bg-success')
    //await successButton.click()

    //const text = await successButton.textContent()

    //force wait
    //await successButton.waitFor({state: "attached"})
    //const text = await successButton.allTextContents()

    //expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test.skip('alternative waits', async({page})=>{
    const successButton = page.locator('.bg-success')
    // wait for element
    //await page.waitForSelector('.bg-success')

    // wait for particular response
    //await page.waitForResponse('http://www.uitestingplayground.com/ajaxdata')

    // wait for network calls to be completed --NOT recommended
    //await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')

})

test.skip('timeouts', async({page}) => {
    ///test.setTimeout(10000)
    test.slow() // increase timeout x 3
    const successBtn = page.locator('.bg-success')
    await successBtn.click()
})