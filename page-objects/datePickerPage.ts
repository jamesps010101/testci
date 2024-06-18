import { Page, expect } from "@playwright/test"

export class DatePickerPage {
    private readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number){
        const calInput = this.page.getByPlaceholder('Form Picker')
        await calInput.click()
        const dateToAssert = await this.selectDateInCalendar(numberOfDaysFromToday)
        await expect(calInput).toHaveValue(dateToAssert)
    }

    async selectDatePickerWithRangeFromToday(startDateFromToday: number, endDateFromToday: number){
        const calInput = this.page.getByPlaceholder('Range Picker')
        await calInput.click()
        const dateToAssertStart = await this.selectDateInCalendar(startDateFromToday)
        const dateToAssertEnd = await this.selectDateInCalendar(endDateFromToday)
        const dateStringToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
        await expect(calInput).toHaveValue(dateStringToAssert)
    }

    private async selectDateInCalendar(numberOfDaysFromToday: number){
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonth = date.toLocaleString('En-US', {month: 'short'})
        const expectedYear = date.getFullYear().toString()
        const dateToAssert = `${expectedMonth} ${expectedDate}, ${expectedYear}`
    
        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const fullMonth = date.toLocaleString('En-US', {month: 'long'})
        const monYear = `${fullMonth} ${expectedYear}`
    
        while(!calendarMonthAndYear.includes(monYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
    
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click()
        return dateToAssert
    }
}