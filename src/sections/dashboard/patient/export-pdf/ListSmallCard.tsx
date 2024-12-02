// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import { Page, View, Document, StyleSheet, Image as ImageIcon, Text, Link } from '@react-pdf/renderer';

// types
import { CustomerList } from 'types/customer';

// assets
const LinkIcon = '/assets/images/icons/link.png';
const Mail = '/assets/images/icons/mail.png';
const Maps = '/assets/images/icons/map.png';
const Phone = '/assets/images/icons/phone.png';

const textPrimary = '#262626';
const textSecondary = '#8c8c8c';
const border = '#f0f0f0';

const styles = StyleSheet.create({
  page: {
    padding: 30
  },
  container: {
    border: `1px solid ${border}`,
    padding: 18,
    flexDirection: 'column',
    '@media max-width: 400': {
      flexDirection: 'column'
    }
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  CardInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: 14,
    lineHeight: 1.57,
    color: textPrimary
  },
  role: {
    fontSize: 10,
    lineHeight: 1.66,
    color: textSecondary
  },
  hr: {
    borderBottom: `1px solid ${border}`,
    paddingTop: 18
  },
  about: {
    paddingTop: 18,
    fontSize: 14,
    lineHeight: 1.57,
    fontWeight: 'demibold',
    color: textPrimary,
    paddingBottom: 18
  },
  IconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  IconRow: {
    width: '48%',
    gap: 10,
    paddingBottom: 10
  },
  icon: {
    width: 12,
    height: 10
  },
  iconTitle: {
    fontSize: 10,
    lineHeight: 1.57,
    color: textSecondary
  },
  chip: {
    border: `1px solid ${textSecondary}`,
    alignItems: 'center',
    borderRadius: '4px',
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 8
  },
  chipTitle: {
    color: textSecondary,
    fontSize: '10px',
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 4,
    paddingTop: 4
  },
  timer: {
    marginTop: 25
  }
});

const avatarImage = '/assets/images/users';

// ==============================|| CUSTOMER - CARD ||============================== //

interface Props {
  patient: CustomerList;
}

export default function ListSmallCard({ patient }: Props) {
  const theme = useTheme();
  return (
    <Document title={`${patient?.fatherName}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.row}>
            <ImageIcon style={styles.image} src={`${avatarImage}/avatar-${!patient.avatar ? 1 : patient.avatar}.png`} />
            <View style={styles.CardInfo}>
              <Text style={styles.title}>{patient.fatherName}</Text>
              <Text style={styles.role}>{patient.role}</Text>
            </View>
          </View>
          <View style={styles.hr} />
          <View>
            <Text style={styles.about}>Hello, {patient.about}</Text>
          </View>
          <View style={styles.IconContainer}>
            <View style={[styles.row, styles.IconRow]}>
              <ImageIcon src={Mail} style={styles.icon} />
              <Text style={styles.iconTitle}>{patient.email}</Text>
            </View>
            <View style={[styles.row, styles.IconRow]}>
              <ImageIcon src={Maps} style={styles.icon} />
              <Text style={styles.iconTitle}>{patient.country}</Text>
            </View>
          </View>
          <View style={styles.IconContainer}>
            <View style={[styles.row, styles.IconRow]}>
              <ImageIcon src={Phone} style={styles.icon} />
              <Text style={styles.iconTitle}>{patient.contact}</Text>
            </View>
            <View style={[styles.row, styles.IconRow]}>
              <ImageIcon src={LinkIcon} style={styles.icon} />
              <Link
                style={[styles.iconTitle, { color: theme.palette.primary.main }]}
                src={`https://${patient.firstName}.en`}
              >{`https://${patient.firstName}.en`}</Link>
            </View>
          </View>
          <View style={[styles.row, { gap: 1, paddingTop: 18 }]}>
            {patient.skills.map((skill: string, index: number) => (
              <View style={styles.chip} key={index}>
                <Text style={styles.chipTitle}>{skill}</Text>
              </View>
            ))}
          </View>
          <View style={styles.timer}>
            <Text style={styles.iconTitle}> Updated in {patient.time}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}