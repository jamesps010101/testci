//import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'
import { test } from '../test-options'

// test.beforeEach(async({page, globalsQaURL}) => {
//     await page.goto('/')
// })

test('parameterized methods', async({pageManager}) => {
    //const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com`
    
    //await pm.navigateTo().formLayoutsPage()
    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'pass123', 'Option 2')

    await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndRememberMe(randomFullName, randomEmail, true)
})