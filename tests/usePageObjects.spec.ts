import { expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'
import { test } from '../test-options'

test.beforeEach(async({page, globalsQaURL}) => {
    //await page.goto('/')
    await page.goto(globalsQaURL)
})

test('navigate to form page @smoke @regression', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('parameterized methods @smoke', async({page, globalsQaURL}) => {
    const pm = new PageManager(page)

    //data generator using faker
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com`
    
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'pass123', 'Option 2')

    //screenshot
    await page.screenshot({path:'screenshots/formsLayoutsPage.png'})
    const buffer = await page.screenshot()
    //console.log(buffer.toString('base64'))

    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndRememberMe(randomFullName, randomEmail, true)

    //screenshot area only
    await page.locator('nb-card', {hasText: 'Inline form'}).screenshot({path:'screenshots/inlineForm.png'})

    // await pm.navigateTo().datePickerPage()
    // await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(5)
    // await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(1, 4)
})

test.only('testing with argos ci', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
})