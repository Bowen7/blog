export const binaryRoot = {
  title: 'n',
  left: {
    title: 'e',
    left: {
      title: 'a'
    },
    right: {
      title: 'd',
      left: { title: 'b' },
      right: { title: 'c' }
    }
  },
  right: {
    title: 'm',
    right: {
      title: 'l',
      right: {
        title: 'k',
        left: {
          title: 'j',
          left: { title: 'h', left: { title: 'f' }, right: { title: 'g' } },
          right: { title: 'i' }
        }
      }
    }
  }
}

export const binaryLevel = 7

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
export const maryLevel = 5

export const tidierRoot = {
  title: 's',
  left: {
    title: 'i',
    left: {
      title: 'g',
      left: {
        title: 'a'
      },
      right: {
        title: 'f',
        left: {
          title: 'b'
        },
        right: {
          title: 'e',
          left: {
            title: 'c'
          },
          right: { title: 'd' }
        }
      }
    },
    right: { title: 'h' }
  },
  right: {
    title: 'r',
    left: {
      title: 'j'
    },
    right: {
      title: 'q',
      left: {
        title: 'o',
        left: {
          title: 'm',
          left: {
            title: 'k'
          },
          right: { title: 'l' }
        },
        right: { title: 'n' }
      },
      right: { title: 'p' }
    }
  }
}
export const tidierLevel = 6
