export const binaryRoot = {
  title: 'o',
  left: {
    title: 'g',
    left: {
      title: 'd',
      left: {
        title: 'c',
        right: {
          title: 'b',
          right: { title: 'a' }
        }
      }
    },
    right: {
      title: 'f',
      left: { title: 'e' }
    }
  },
  right: {
    title: 'n',
    left: {
      title: 'l',
      left: {
        title: 'j',
        left: {
          title: 'i',
          left: {
            title: 'h'
          }
        }
      },
      right: { title: 'k' }
    },
    right: { title: 'm' }
  }
}
export const binaryMaxLevel = 6

export const tidierRoot = {
  title: 'm',
  left: {
    title: 'f',
    left: {
      title: 'd',
      right: {
        title: 'c',
        right: {
          title: 'b',
          right: {
            title: 'a'
          }
        }
      }
    },
    right: { title: 'e' }
  },
  right: {
    title: 'l',
    left: { title: 'g' },
    right: {
      title: 'k',
      left: {
        title: 'j',
        left: {
          title: 'i',
          left: { title: 'h' }
        }
      }
    }
  }
}
export const tidierMaxLevel = 6

export const maryRoot = {
  title: 'r',
  children: [
    {
      title: 'e',
      children: [
        { title: 'a' },
        { title: 'd', children: [{ title: 'b' }, { title: 'c' }] }
      ]
    },
    { title: 'f' },
    {
      title: 'n',
      children: [
        { title: 'g' },
        {
          title: 'm',
          children: [
            { title: 'h' },
            { title: 'i' },
            { title: 'j' },
            { title: 'k' },
            { title: 'l' }
          ]
        }
      ]
    },
    { title: 'q', children: [{ title: 'p', children: [{ title: 'o' }] }] }
  ]
}

export const maryMaxLevel = 4
