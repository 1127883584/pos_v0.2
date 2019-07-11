'use strict';

const printReceipt = (inputs) => {
  const itemSummary = calculateItemSummary(inputs)
  console.log(buildReceiptByItemSummary(itemSummary))
}

const calculateItemCount = (inputs) => {
    const itemCount = {}
    for(let i = 0; i < inputs.length; i++) {
        if (!itemCount[inputs[i]]) {
            itemCount[inputs[i]] = 1
        } else {
            itemCount[inputs[i]] ++
        }
    }
    return itemCount
}

const calculateItemSummary = (inputs) => {
    const itemSummary = []
    const allItems = loadAllItems()
    const itemCount = calculateItemCount(inputs)
    for (let key in itemCount) {
        for(let i = 0 ;i < allItems.length; i ++){
            if (key === allItems[i]['barcode']) {
                let item = {}
                item['name'] = allItems[i]['name']
                item['unit'] = allItems[i]['unit']
                item['price'] = toDecimal2(allItems[i]['price'])
                item['count'] = itemCount[key]
                item['summary'] = toDecimal2(allItems[i]['price']*item['count'])
                itemSummary.push(item)
                break
            }
        }
    }
    return itemSummary
}

const buildReceiptByItemSummary = (itemSummary) => {
    let receipt = `***<没钱赚商店>收据***` + '\n'
    for(let i = 0; i < itemSummary.length; i ++) {
        receipt += `名称：${itemSummary[i]['name']}，数量：${itemSummary[i]['count']}${itemSummary[i]['unit']}，单价：${itemSummary[i]['price']}(元)，小计：${itemSummary[i]['summary']}(元)\n`
    }
    receipt += `----------------------
总计：${toDecimal2(calculateTotal(itemSummary))}(元)
**********************`
    return receipt
}

const toDecimal2 = (x) => {
    let f = parseFloat(x)
    if (isNaN(f)) {
       return false
    }
    f = Math.round(x*100)/100
    let s = f.toString()
    let rs = s.indexOf('.')
    if (rs < 0) {
       rs = s.length
       s += '.'
    }
    while (s.length <= rs + 2) {
       s += '0'
    }
    return s
}

const calculateTotal = (receipt) => {
    let totalPrice = 0
    for(let i = 0; i < receipt.length; i ++) {
        totalPrice += parseInt(receipt[i]['summary'])
    }
    return totalPrice
}
