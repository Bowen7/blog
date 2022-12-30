export const root = {
  title: 'a',
  children: [
    {
      title: 'b',
      children: [
        {
          title: 'd',
          children: []
        },
        {
          title: 'e',
          children: [
            {
              title: 'h',
              children: [
                {
                  title: 'n',
                  children: []
                },
                {
                  title: 'o',
                  children: []
                }
              ]
            },
            {
              title: 'i',
              children: [
                {
                  title: 'p',
                  children: []
                }
              ]
            },
            {
              title: 'j',
              children: []
            }
          ]
        }
      ]
    },
    {
      title: 'c',
      children: [
        {
          title: 'f',
          children: []
        },
        {
          title: 'g',
          children: [
            {
              title: 'k',
              children: [
                {
                  title: 'q',
                  children: []
                }
              ]
            },
            {
              title: 'l',
              children: []
            },
            {
              title: 'm',
              children: [
                {
                  title: 'r',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
export const maxLevel = 5

export const binaryRoot = {
  title: 'a',
  left: {
    title: 'b',
    left: {
      title: 'd'
    },
    right: {
      title: 'e',
      left: { title: 'g' },
      right: { title: 'h' }
    }
  },
  right: {
    title: 'c',
    right: {
      title: 'f',
      right: {
        title: 'i',
        left: {
          title: 'j',
          left: { title: 'k', left: { title: 'm' }, right: { title: 'n' } },
          right: { title: 'l' }
        }
      }
    }
  }
}
export const binaryMaxLevel = 7

export const trRoot = {
  title: 'a',
  left: {
    title: 'b',
    left: {
      title: 'd',
      left: { title: 'h', right: { title: 'l' } }
    },
    right: {
      title: 'e',
      left: { title: 'i' }
    }
  },
  right: {
    title: 'c',
    left: {
      title: 'f',
      left: {
        title: 'j'
      },
      right: { title: 'k' }
    },
    right: { title: 'g' }
  }
}
