class BankApi {
    _dateBase = '20220901';
    _ticketBase = 'EUR';

    getResource = async (url: string) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`)
        }
        return await res.json();
    }

    // https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json ?valcode=EUR&date=YYYYMMDD

    getAllRates = async (date: string = this._dateBase) => {
        const res = await this.getResource(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json&date=${date}`);
        return this._transformAllRates(res);
    }

    getRate = async (date: any = this._dateBase, ticket: any = this._ticketBase) => {
        const res = await this.getResource(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json&valcode=${ticket}&date=${date}`);
        return this._transformRate(res);
    }

    _transformAllRates = (data: any[]) => {
        return data.map((item) => ({
            id: item.r030,
            ticket: item.cc,
            rate: item.rate
        }))
    }

    _transformRate = (item: any) => {
        return item[0].rate;
    }
}


export default BankApi;