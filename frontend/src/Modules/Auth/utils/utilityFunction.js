export function convertOccupationData(data) {
  return Object.entries(data).map(([category, occupations]) => {
    return {
      label: category,
      options: occupations.map((occupation) => {
        const value = occupation
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-') // Replace spaces and special characters with hyphens
          .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens if present

        return {
          value,
          label: occupation,
          sector: category.toLowerCase().replace(/\s+/g, '-'),
        };
      }),
    };
  });
}
