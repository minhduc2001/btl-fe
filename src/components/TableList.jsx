import * as React from 'react';
import styled from 'styled-components'

import { Button, Space, Table, Tag } from 'antd';
import 'antd/dist/antd.css';
import Column from 'antd/lib/table/Column';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import CallAPI from '../utils/CallAPI';
import { useNavigate } from 'react-router-dom';


export default function BookList({ children, deleteBook }) {
    const navigate = useNavigate()
    return (
        <Container>
            <div className="book-list">
                <h4>List Book</h4>
                <div className="action">
                    <span>Tổng số sách: {children?.length}</span>
                    <Button type="primary" size='large' onClick={()=>navigate('/book-detail')}>ADD NEW BOOK</Button>
                </div>
                <Table dataSource={children}>
                    <Column title="Title" dataIndex="title" key="title" />
                    <Column title="Author" dataIndex="author" key="author" />
                    <Column title="Description" dataIndex="desc" key="desc" />
                    <Column title="Publish Date" dataIndex="publish" key="publish" />
                    <Column title="Page Number" dataIndex="page" key="page" />
                    <Column
                        title="Category"
                        dataIndex="category"
                        key="category"
                    // render={(tags) => (
                    //     <>
                    //         {tags.map((tag) => (
                    //             <Tag color="blue" key={tag}>
                    //                 {tag}
                    //             </Tag>
                    //         ))}
                    //     </>
                    // )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(_, record) => (
                            <Space size="small">
                                <Button type="primary" style={{ background: 'green' }} onClick={()=>navigate(`/book-detail/${_.id}`)}>
                                    View
                                </Button>
                                <Button type="primary" danger onClick={(e) => deleteBook(e, _.id)}>
                                    Delete
                                </Button>
                            </Space>
                        )}
                    />
                </Table>
            </div>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    font-size: 14px;
    .book-list {
        width: 80%;
        height: 100%;
        margin: 0 auto;
        padding-top: 10px;
        .action {
            margin: 10px 5px;
            display: flex;
            justify-content: space-between;
        }
        h4 {
            text-transform: capitalize;
            font-size: 40px;
            text-align: center;
            leter-spacing: 2px;
        }
    }
`