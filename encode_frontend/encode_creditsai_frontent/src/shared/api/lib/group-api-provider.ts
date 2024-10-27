import {BaseProduct, CompanyMetadata} from '@/shared/api';

export function groupProductsByCompany(
  products: BaseProduct[],
): CompanyMetadata[] {
  // First, create a map to group products by company
  const groupedMap = products.reduce((acc, product) => {
    const companyName = product.company_name;

    if (!acc.has(companyName)) {
      acc.set(companyName, {
        company_name: companyName,
        company_logo: product.logo_link,
        contract_address: product.contract_address,

        total_credits: 0,
        product_count: 0,
        total_value: 0,
        products: [],
      });
    }

    const companyData = acc.get(companyName)!;
    companyData.total_credits += product.credits;
    companyData.product_count += 1;
    companyData.total_value += product.price;
    companyData.products.push(product);

    return acc;
  }, new Map<string, CompanyMetadata>());

  // Convert the map to array and sort by company name
  return Array.from(groupedMap.values()).sort((a, b) =>
    a.company_name.localeCompare(b.company_name),
  );
}
