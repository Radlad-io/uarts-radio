// TODO: Design a home page

// frontend/pages/index.js
import Link from "next/link";
import { baseUrl, fetchQuery } from "../utilities/utils";

import Layout from "@components/layouts/Layout";
import Navbar from "@components/modules/Navbar";

import { PostCard } from "@components/modules/Card";
import Footer from "@components/modules/Footer";
import SectionTitle from "@components/elements/SectionTitle";
import styled from 'styled-components'

const HeadingStyle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-top: 2.5em;
`

export default function About({ posts }) {
  return (
    <Layout title="UArts Radio" description="">
      <Navbar></Navbar>

      <div className="container mx-auto px-3 xl:px-20">
      <HeadingStyle>
        About UArts Radio
      </HeadingStyle>
        <br />
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras erat
          quam, placerat ac rhoncus id, luctus vel enim. Nam quam ligula,
          placerat quis sem tempor, pellentesque consectetur urna. Donec
          venenatis fermentum scelerisque. Vestibulum eget felis venenatis,
          sodales eros in, pretium turpis. Duis consectetur ornare ipsum, in
          euismod nisl lacinia in. Fusce suscipit ligula vel malesuada
          malesuada. Pellentesque a purus lectus. Nullam sed rutrum augue.
          Mauris at tristique nibh. Vestibulum odio ex, malesuada quis iaculis
          nec, congue ut dolor. Etiam velit magna, convallis in vestibulum eu,
          consectetur volutpat arcu. Duis sollicitudin sapien id scelerisque
          fringilla. Maecenas eget faucibus tortor, quis commodo dolor. Vivamus
          at leo bibendum diam pulvinar venenatis.
          <br />
          <br />
          Ut luctus condimentum semper. Pellentesque faucibus arcu id auctor
          fermentum. Nulla mauris ipsum, semper ut lacus ac, facilisis elementum
          mi. Nullam faucibus mattis dui, sed dapibus ligula dictum a. Donec vel
          dictum metus. In in ullamcorper nunc. Nulla non mollis ligula, nec
          volutpat dolor. Aenean finibus consequat hendrerit. Pellentesque
          mollis, erat ac volutpat finibus, dui purus sodales ante, consequat
          facilisis nisl odio ac tortor. Aliquam non justo volutpat tellus
          molestie eleifend in interdum quam. Vestibulum luctus aliquam ipsum
          posuere fermentum. Quisque ut tristique nisi.
          <br />
          <br />
          Nullam quam odio, luctus auctor fermentum vitae, auctor euismod nibh.
          Pellentesque fermentum risus erat, vel molestie tortor mattis nec. In
          hac habitasse platea dictumst. Suspendisse a consequat tortor.
          Curabitur egestas finibus vulputate. Sed tincidunt vulputate diam,
          eget pharetra turpis commodo eu. Pellentesque semper consectetur massa
          auctor ornare. Proin at diam ut quam suscipit lobortis. Nullam posuere
          dui magna, id tincidunt velit consequat in. Etiam pellentesque dapibus
          metus, ut fringilla mi malesuada eget. Aliquam pulvinar lacinia sem id
          tincidunt. Morbi viverra dui facilisis posuere tempus.
          <br />
          <br />
        </p>
      </div>

      <Footer />
      <style jsx>{``}</style>
    </Layout>
  );
}
