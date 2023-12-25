const a = [
  {
    id: 6,
    attributes: {
      name: 'Katalóg',
      createdAt: '2023-12-25T17:55:45.166Z',
      updatedAt: '2023-12-25T19:11:15.783Z',
      publishedAt: '2023-12-25T17:55:45.955Z',
      locale: 'sk',
      slug: 'katalog',
      root: true,
      products: { data: [] },
      children: {
        data: [
          {
            id: 7,
            attributes: {
              slug: 'karton',
              name: 'Kartón',
              products: { data: [] },
              children: { data: [] },
            },
          },
          {
            id: 8,
            attributes: {
              slug: 'kompresor',
              name: 'Kompresor',
              products: { data: [] },
              children: { data: [] },
            },
          },
          {
            id: 9,
            attributes: {
              slug: 'rurkove-vybavenie',
              name: 'Rúrkové vybavenie',
              products: { data: [] },
              children: {
                data: [
                  {
                    id: 10,
                    attributes: {
                      slug: 'rury-hlinikove',
                      name: 'Rúry hliníkové',
                      products: {
                        data: [
                          {
                            id: 2,
                            attributes: {
                              slug: 'omega-80al',
                              name: 'OMEGA-80AL',
                            },
                          },
                        ],
                      },
                      children: { data: [] },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  },
];

function getEquipmentMenuLinks(data, prefix = '') {
  return data.map((v) => {
    const label = v.attributes.name;
    const url = `${prefix}/${v.attributes.slug}`;

    if (!v?.attributes?.children?.data?.length) {
      return {
        label,
        url,
      };
    }

    return {
      label,
      url,
      children: getEquipmentMenuLinks(v?.attributes?.children?.data, url),
    };
  });
}

console.log(getEquipmentMenuLinks(a));
