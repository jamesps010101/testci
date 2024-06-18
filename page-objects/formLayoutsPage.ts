import {Locator, Page} from '@playwright/test'

export class FormLayoutPage {
    private readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string){
        const usingTheGridForm = this.page.locator('nb-card', {hasText: 'Using the Grid'})
        await usingTheGridForm.getByRole('textbox', {name: 'Email'}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: 'Password'}).fill(password)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridForm.getByRole('button').click()
    }

    /**
     * This method fills out the line form, etc...
     * @param name - should be first/last name
     * @param email - valid email
     * @param remember - true or false for checkbox
     */
    async submitInlineFormWithNameEmailAndRememberMe(name: string, email: string, remember: boolean = false){
        const inlineForm = this.page.locator('nb-card', {hasText: 'Inline form'})
        await inlineForm.getByPlaceholder('Jane Doe').fill(name)
        await inlineForm.getByRole('textbox', {name: 'Email'}).fill(email)
        if (remember)
            await inlineForm.getByRole('checkbox').check({force: true})
        await inlineForm.getByRole('button').click()
    }
}