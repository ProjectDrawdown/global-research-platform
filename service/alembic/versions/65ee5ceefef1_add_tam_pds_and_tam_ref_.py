"""add tam_pds and tam_ref tables

Revision ID: 65ee5ceefef1
Revises: d657375bff6e
Create Date: 2021-08-12 00:59:55.979222

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision = '65ee5ceefef1'
down_revision = 'd657375bff6e'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('tam_ref',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('author_id', sa.Integer(), nullable=True),
    sa.Column('ref_name', sa.String(), nullable=True),
    sa.Column('is_public', sa.Boolean(), nullable=True),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('technology', sa.String(), nullable=True),
    sa.Column('data', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_tam_ref_name'), 'tam_ref', ['name'], unique=False)
    

    op.create_table('tam_pds',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('author_id', sa.Integer(), nullable=True),
    sa.Column('ref_name', sa.String(), nullable=True),
    sa.Column('is_public', sa.Boolean(), nullable=True),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('technology', sa.String(), nullable=True),
    sa.Column('data', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_tam_pds_name'), 'tam_pds', ['name'], unique=False)

def downgrade():
    op.drop_index(op.f('ix_tam_ref_name'), table_name='tam_ref')
    op.drop_table('tam_ref')
    op.drop_index(op.f('ix_tam_pds_name'), table_name='tam_pds')
    op.drop_table('tam_pds')

