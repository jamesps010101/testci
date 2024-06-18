import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')
})

test('drag and drop with iframe', async({page}) => {
    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
    const targ = frame.locator('li', {hasText: 'High Tatras 2'})
    await targ.dragTo(frame.locator('#trash'))

    //more precise control
    const targ2 = frame.locator('li', {hasText: 'High Tatras 4'})
    await targ2.hover()
    await page.mouse.down()
    await frame.locator('#trash').hover()
    await page.mouse.up()

    await expect(frame.locator('#trash li h5')).toHaveText(['High Tatras 2', 'High Tatras 4'])
})