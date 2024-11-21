import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

import File from '../../assets/pdf.pdf'

const BookPDFViewer = () => {
    return (
        <>
            <PDFViewer className="w-[80%] h-[99lvh]">
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                            <Text>Section #1</Text>
                            <Text>ddddd</Text>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </>
    )
}

export default BookPDFViewer